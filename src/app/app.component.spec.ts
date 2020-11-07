import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatTableModule

      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gernerate-report-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('gernerate-report-ui');
  });

  it('should render h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const h1Ele = fixture.debugElement.query(By.css('h1'));
    expect(h1Ele.nativeElement.textContent).toContain('File Upload');
  });
  it('should contain upload  button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const uploadBtn: HTMLButtonElement = buttons[0].nativeElement;
    expect(buttons.length >= 1).toBeTruthy();
    expect(uploadBtn.textContent).toBe('Upload');
  });
  it('should upload a file', () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.selectedFile = null;
    component.selectedFileId = null;
    component.isDataVisible = null;
    fixture.detectChanges();
    const inputEle = fixture.debugElement.query(By.css('input'));
    const form = fixture.debugElement.query(By.css('form'));
    const fileInput: HTMLInputElement = inputEle.nativeElement;
    const fileList = { 0: { name: 'sample', size: 2000001 } };
    fileInput.dispatchEvent(new Event('change'));
    //expect(component.selectedFile).toBeTruthy();

  });
});
