import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
    {
        duration: '10m',
        target:1000
    },
    {
        duration: '30m',
        target:1000
    },
    {
        duration: '10m',
        target:0
    }
]
}

export default function() {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
    http.get('https://test.k6.io/news.php');

}