import {Component, HostListener, OnInit} from '@angular/core';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-serverstatus',
  templateUrl: './serverstatus.component.html',
  styleUrls: ['./serverstatus.component.css']
})
export class ServerstatusComponent implements OnInit {

  public availableServers = [
    'dash',
    'verse',
    'legends',
    'club',
    'brawl',
    'zone',
    'total'
  ];

  public serverIPs = [
    'play.pokedash.org:25565',
    'play.pokeverse.org:25565',
    'play.pokelegends.net:25565',
    'play.pokeclub.net:25565',
    'play.poke-brawl.com:25565',
    'play.pokezone.net:25565'
  ];

  observableServerCounts;

  totalsMax = 0;
  totalsOnline = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getServerCounts()
        .then(value => {
          this.observableServerCounts = value;
        })
        .catch(reason => {
          console.log(reason);
        })
        .finally(() => {
          this.adjustWidth();
        });
    }, 50);
  }

  async getServerCounts() {
    const serverCounts: any[] = [];
    for (const fullIP of this.serverIPs) {
      const url = `https://api.mcsrvstat.us/2/${fullIP}`;
      await this.http.get(url)
        .toPromise()
        .then((response: any) => {
          serverCounts.push(response);

          this.totalsOnline += response.players.online;
          this.totalsMax += response.players.max;
        })
        .catch(reason => {
          console.log(reason);
        });
    }

    return of(serverCounts);
  }

  formatMOTD(motd) {
    let temp = '';
    for (const line of motd) {
      temp = temp + line + '<br>';
    }
    return temp;
  }

  @HostListener('window:resize')
  adjustWidth() {
    const statusBody = document.getElementById('serverStatusBody').offsetWidth;

    for (const ip of this.availableServers) {
      const card = document.getElementById(ip);
      if (card === null) {
        setTimeout(() => {
          this.adjustWidth();
        }, 50);
        break;
      }
      card.style.margin = `0 ${((statusBody - card.offsetWidth) / 2) / 16}rem`;
    }
  }

}
