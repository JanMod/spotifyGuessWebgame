import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs/Rx';
import { RestApiService} from '../restApi.service';


@Injectable()
export class RoomsServiceService {

	roomEvent:any;

	constructor(private wsService: RestApiService) {
		/*this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					author: data.author,
					message: data.message
				}
	  });*/
	  
	  this.roomEvent = wsService.connectIO('localhost:8000');

	}

	getAllRooms(){
		return this.wsService.getRooms();
	}

	getCurrentRoomsWS(){
		return this.roomEvent;
	}

	
}
