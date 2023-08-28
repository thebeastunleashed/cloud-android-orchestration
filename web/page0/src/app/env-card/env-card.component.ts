import {Component, Input} from '@angular/core';
import {Environment, EnvStatus} from '../interface/env-interface';
import {EnvService} from '../env.service';

const tooltips = {
  [EnvStatus.starting]: 'Starting',
  [EnvStatus.running]: 'Running',
  [EnvStatus.stopping]: 'Stopping',
  [EnvStatus.error]: 'Error',
};

const icons = {
  [EnvStatus.starting]: 'pending',
  [EnvStatus.running]: 'check_circle',
  [EnvStatus.stopping]: 'stop_circle',
  [EnvStatus.error]: 'error',
};

@Component({
  selector: 'app-env-card',
  templateUrl: './env-card.component.html',
  styleUrls: ['./env-card.component.scss'],
})
export class EnvCardComponent {
  @Input() env!: Environment;

  constructor(private envService: EnvService) {}

  ngOnInit() {}

  getCardSetting() {
    const status = this.env.status;
    return {
      tooltip: tooltips[status],
      icon: icons[status],
      backgroundColor: 'aliceblue',
    };
  }

  isRunning() {
    return this.env.status === EnvStatus.running;
  }

  onClickGoto() {
    const {hostUrl, groupName} = this.env;
    // TODO: use safeurl
    window.open(`${hostUrl}/?groupId=${groupName}`);
  }

  onClickDelete() {
    // TODO: this should delete host where env lies on
    this.envService.deleteEnv(this.env);
  }
}
