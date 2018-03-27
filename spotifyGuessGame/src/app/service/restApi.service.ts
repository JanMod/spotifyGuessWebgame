import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core/src/metadata/directives';


@Injectable()

export class RestApiService {

    private createRoomRoute: string;
    response: any;
    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.createRoomRoute = 'http://localhost:8000/api/createRoom';
    }

    createRoom(data) {

        return this.http.post('api/createRoom', data);

    }
}

