import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyComponentComponent } from './spotify-component.component';

describe('SpotifyComponentComponent', () => {
  let component: SpotifyComponentComponent;
  let fixture: ComponentFixture<SpotifyComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
