import { check } from 'k6';
import http from 'k6/http';
import {sleep,group} from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page::Assets}': ['p(95)<8000'],
        'group_duration{group:::Main page}': ['p(95)<6000'],
        'group_duration{group:::News page}': ['p(95)<3000']
    }
}

export default function()
{
    group('Main page',function () {

        
        const res = http.get('https://run.mocky.io/v3/049c42fc-358d-4959-ba12-bd7550c232e5 ?mocky-delay=5000ms');
        check(res,{'status is 200' : (r) => r.status === 200}); 

        group('Assets',function () {
        http.get('https://test.k6.io/static/css/site.css ?mocky-delay=1000ms');
        http.get('https://test.k6.io/static/js/prisms.js ?mocky-delay=1000ms');
        });     
    });

   

   group('News page',function () {
    http.get('https://test.k6.io/news.php ?mocky-delay=5000ms');

   });
   

}