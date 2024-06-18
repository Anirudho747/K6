import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        'http_req_duration{status:200}' : ['p(95)<1000'],
        'http_req_duration{status:201}' : ['p(95)<1000'],

    }
}

export default function()
{
   http.get('https://run.mocky.io/v3/9674f0e5-b48d-40f9-b134-fb99714d2be8');
   http.get('https://run.mocky.io/v3/049c42fc-358d-4959-ba12-bd7550c232e5?mocky-delay=3000ms');
}