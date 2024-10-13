import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { userSettingsPage } from './userSettings.page';

describe('userSettingsPage', () => {
  let component: userSettingsPage;
  let fixture: ComponentFixture<userSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [userSettingsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(userSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
