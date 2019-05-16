import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAlertModule, NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSpinKitModule } from 'ng-spin-kit';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRedComponent } from './components/add-red/add-red.component';
import { AgregarRecursoComponent } from './components/agregar-recurso/agregar-recurso.component';
import { DetalleRecursoComponent } from './components/detalle-recurso/detalle-recurso.component';
import { DetalleREDComponent } from './components/detalle-red/detalle-red.component';
import { ProyectosRedComponent } from './components/proyectos-red/proyectos-red.component';
import { RedRecursosDetalleComponent } from './components/red-recursos-detalle/red-recursos-detalle.component';
import { RedAsignadosComponent } from './components/red/asignaciones/red-asignados.component';
import { RedsPorPersonaComponent } from './components/reds-por-persona/reds-por-persona.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RedRecursosComponent } from "./components/red-recursos/red-recursos.component";
import { RedsRelacionadosComponent } from "./components/reds-relacionados/reds-relacionados.component";
import { VerAvanceRedComponent } from './components/ver-avance-red/ver-avance-red.component';
import { AgregarRecursoClientService } from './services/recurso/agregar/agregar-recurso-client.service';
import { ResourceDetailsRestClientService } from './services/recurso/detalle/resource-details-rest-client.service';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { SideBarComponent } from './components/dashboard/side-bar/side-bar.component';
import { FooterComponent } from './components/dashboard/footer/footer.component';
import { TabPanesComponent } from './components/dashboard/tab-panes/tab-panes.component';
import { ComentarImagenComponent } from './components/comentar-imagen/comentar-imagen.component';
import { RedCrearVersionComponent } from './components/red-crear-version/red-crear-version.component';
import { BuscarRedComponent } from './components/buscar-red/buscar-red.component';
import { VerVersionRedComponent } from './components/ver-version-red/ver-version-red.component';
import { VersionRedRevisionService } from './services/version/version-red-revision.service';
import { ComentariosVersionVideoComponent } from './components/comentarios-version-video/comentarios-version-video.component';
import { BuscarRecursoComponent } from './components/buscar-recurso/buscar-recurso.component';
import { HabilitarUsuarioComponent } from './components/HabilitarUsuario/Habilitar-Usuario.component';
import { HabilitarUsuarioClientService } from './services/HabilitarUsuario/habilita-usuario-client.service';
import { VersionRedRevisionComponent } from './components/version-red-revision/version-red-revision.component';
import { DashboardProyectosConectateComponent } from './components/dashboard-proyectos-conectate/dashboard-proyectos-conectate.component';


@NgModule({
  declarations: [
    AppComponent,
    RedsPorPersonaComponent,
    AddRedComponent,
    RedAsignadosComponent,
    DetalleREDComponent,
    ProyectosRedComponent,
    AppComponent,
    RedsRelacionadosComponent,
    RedRecursosDetalleComponent,
    RedRecursosComponent,
    DetalleRecursoComponent,
    VerAvanceRedComponent,
    AgregarRecursoComponent,
    NotFoundComponent,
    VersionRedRevisionComponent,
    LoginComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    TabPanesComponent,
    ComentarImagenComponent,
    VerVersionRedComponent,
    RedCrearVersionComponent,
    BuscarRedComponent,
    ComentariosVersionVideoComponent,    
    HabilitarUsuarioComponent,        
    HabilitarUsuarioComponent,
    TabPanesComponent,
    BuscarRecursoComponent,
    DashboardProyectosConectateComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSpinKitModule,
    NgbAlertModule,
    NgbPaginationModule,
    NgbModule,
    HttpModule,
    NgxSpinnerModule,
    CKEditorModule
  ],
  providers: [AgregarRecursoClientService, ResourceDetailsRestClientService, VersionRedRevisionService, HabilitarUsuarioClientService],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
