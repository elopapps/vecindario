import { TestBed, ComponentFixture } from '@angular/core/testing';
import  {ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('Component: Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule],
      providers:[LoginService],
      declarations: [LoginComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    let errors = {};
    let user = component.loginForm.controls['inputUser'];
    expect(user.valid).toBeFalsy();

    // username field is required
    errors = user.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set username to something
    user.setValue("test");
    errors = user.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.loginForm.controls['inputPassword'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('submitting the form hides button', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['inputUser'].setValue("test@test.com");
    component.loginForm.controls['inputPassword'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();

    //  get the "button" element by CSS selector (e.g., by class name)
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('#log'));
    
    expect(el.nativeElement.hasAttribute('hidden')).toEqual(false);

    el.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(el.nativeElement.hasAttribute('visible')).toEqual(false);
  });
})
;