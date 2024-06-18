import http from 'k6/http';
import { check } from 'k6';
import {sleep} from 'k6';
import exec from 'k6/execution';
import {Counter} from 'k6/metrics';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<300'],
        http_req_duration: ['max<200'],
        http_req_failed: ['rate<0.01'],
        http_reqs:['count>40'],
        http_reqs:['rate>10'],
        vus: ['value>7'],
        checks: ['rate>=.99'],
        myCounter: ['count>10']
    }
}

let myCounter = new Counter('myCounter');

export default function()
{
    myCounter.add(1);
    const res = http.get('https://test.k6.io/contacts.php'+ (exec.scenario.iterationInTest=== 1 ? 'foo':''));
    console.log(res.status);
 //   console.log(res.body);
    check(res,{
        'status is 200' : (r) => r.status === 200,
        'page is StartPage' : (r) => r.body.includes('Contact us')
    });

    sleep(2);
}