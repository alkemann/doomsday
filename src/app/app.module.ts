import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { GameComponent } from './game/game.component';

import { SetupComponent } from './game/setup/setup.component';
import { RoundComponent } from './game/round/round.component';
import { JudgeComponent } from './game/judge/judge.component';
import { ResultComponent } from './game/result/result.component';
import { RulesComponent } from './game/rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    GameComponent,
    SetupComponent,
    RoundComponent,
    JudgeComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatSlideToggleModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
