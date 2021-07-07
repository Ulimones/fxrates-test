import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FixerService {

  API_URL: String = 'http://data.fixer.io/api/'
  API_KEY: String= '4c0d2cc3ac71ad3d3ab6629f54c588a4'

  constructor(private http: HttpClient) {}



  getLatest() {
	return new Promise((resolve, reject) => {
		this.http.get(`${this.API_URL}/latest?access_key=${this.API_KEY}`)
		.subscribe((res: any) => {
			 resolve(res);
		}, (err) => {
			reject(err);
		});
	});
}


  getHistorical(date) {
		return new Promise((resolve, reject) => {
			this.http.get(`${this.API_URL}/${date}?access_key=${this.API_KEY}`)
			.subscribe((res: any) => {
				 resolve(res);
			}, (err) => {
				reject(err);
			});
		});
  }



}
