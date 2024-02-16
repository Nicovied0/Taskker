import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CloudinaryService } from 'src/app/core/services/Cloudinary.service';
import { EditProfileService } from 'src/app/core/services/EditProfile.service';
import { ProfileService } from 'src/app/core/services/Profile.service';
import { UserService } from 'src/app/core/services/User.service';

@Component({
  selector: 'app-editprofileview',
  templateUrl: './editprofileview.component.html',
  styleUrls: ['./editprofileview.component.scss'],
})
export class EditprofileviewComponent {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
    private editProfileService: EditProfileService,
    private cloudinaryService: CloudinaryService
  ) {}

  isLargeScreen: boolean = true;
  user: any;
  role: any;
  idUser: any;
  editedUser: any = {
    name: '',
    role: '',
    email: '',
    image: '',
  };
  showEdit: boolean = false;

  ngOnInit() {
    this.getProfile();
    this.isLargeScreen = this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = this.checkScreenSize();
  }

  checkScreenSize(): boolean {
    return window.innerWidth >= 750;
  }

  getProfile() {
    this.idUser = this.profileService.getUserDataFromLocalStorage();
    this.getProfileByBd();
  }

  getProfileByBd() {
    this.userService.getUserById(this.idUser.id).subscribe(
      (data: any) => {
        this.user = data;
        this.editedUser.role = this.user.role;
        this.editedUser.name = this.user.name;
        this.editedUser.email = this.user.email;
        this.editedUser.description = this.user.description;
        this.editedUser.phone = this.user.phone;
      },
      (error) => {
        console.error('Error obteniendo estados:', error);
      }
    );
  }

  saveChanges() {
    if (this.editedUser.image === '') {
      this.editedUser.image = this.user.imagen;
    }

    this.editProfileService
      .updateProfile(this.user._id, this.editedUser)
      .subscribe((updatedProfile) => {
        if (updatedProfile) {
          console.log('Perfil actualizado correctamente:', updatedProfile);
          // Eliminar el dato de imagen antiguo del localStorage
          localStorage.removeItem('userData');
          // Actualizar el dato de imagen nuevo en el localStorage
          const updatedUserData =
            this.profileService.getUserDataFromLocalStorage();
          updatedUserData.imagen = this.editedUser.image;
          localStorage.setItem('userData', JSON.stringify(updatedUserData));
        } else {
          console.error('Error al actualizar el perfil');
        }
      });

    this.showEdit = false;
    window.location.reload();
  }

  showEditForm() {
    this.showEdit = !this.showEdit;
  }

  onProfileImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.uploadProfileImage(file);
      this.editedUser.imagen = URL.createObjectURL(file);
    }
  }

  uploadProfileImage(image: File) {
    this.cloudinaryService.uploadImage(image).subscribe(
      (response: any) => {
        this.editedUser.imagen = response.url;
      },
      (error: any) => {
        console.error('Error al cargar la imagen de perfil:', error);
      }
    );
  }

  deleteImage() {
    this.editedUser.image = '';
  }
}
