import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-images',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule],
    templateUrl: './images.html',
    styleUrl: './image.css'
})
export class ImagesComponent {
    title = signal('Image Gallery');
    images = signal<any[]>([]);
    selectedFile: File | null = null;
    error = signal<string | null>(null);

    API_URL = environment.API_URL;

    constructor() {
        this.loadImages();
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    async uploadImage() {
        if (!this.selectedFile) return;
        const formData = new FormData();
        formData.append('image', this.selectedFile);

        try {
            await axios.post(`${this.API_URL}/image/upload`, formData);
            this.selectedFile = null;
            this.loadImages();
        } catch (error: any) {
            this.error.set(error.message || "Upload Failed");
        }
    }

    async loadImages() {
        const res = await axios.get(`${this.API_URL}/image/images`);
        this.images.set(res.data);
    }

    async downloadImage(img: any) {
        try {
            const response = await axios.get(`${this.API_URL}/image/image/${img._id}`, {
                responseType: 'blob' // get raw binary data
            });

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', img.filename); // set filename
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error: any) {
            this.error.set(error.message || 'Download Failed');
        }
    }

    async deleteImage(img: any) {
        try {
            await axios.delete(`${this.API_URL}/image/image/${img._id}`);
            this.loadImages();
        } catch (error: any) {
            this.error.set(error.message || "Delete Failed");
        }
    }
}