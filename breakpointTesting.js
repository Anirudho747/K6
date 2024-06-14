import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
    {
        duration: '5h',
        target:50000
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