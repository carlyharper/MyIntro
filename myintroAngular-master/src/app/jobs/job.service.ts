import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../classes/auth-user';

@Injectable()
export class JobService {

  private jobDataSource = new Subject<Object>()

  $jobData = this.jobDataSource.asObservable()


  constructor(private http: HttpClient) {

  }

  job:Object
  

  getJob(user: AuthUser, id: string) {
    let url = 'https://t1v62iqgg7.execute-api.us-east-1.amazonaws.com/prod/getjobbyid'
    let params = {
      id: id,
      uid: user.get('uid'),
      authToken: user.get('authToken')
    }

    let promise = new Promise((resolve, reject) => {
      this.http.request("POST", url, {
        body: params,
        headers: {
          'Content-Type': 'application/json'
        }
      }).toPromise().then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    })

    promise.then(
      res =>{
        this.job = res
        this.jobDataSource.next(res)
      },
      err => {
        this.job = null
        this.jobDataSource.next(null)
      }
    )
  }

  getJobAsPromise(user: AuthUser, id: string) {
    let url = 'https://t1v62iqgg7.execute-api.us-east-1.amazonaws.com/prod/getjobbyid'
    let params = {
      id: id,
      uid: user.get('uid'),
      authToken: user.get('authToken')
    }

    let promise = new Promise((resolve, reject) => {
      this.http.request("POST", url, {
        body: params,
        headers: {
          'Content-Type': 'application/json'
        }
      }).toPromise().then(
        res => {
          this.job = res
          this.jobDataSource.next(res)
          resolve(res)
        },
        err => {
          this.job = null
          this.jobDataSource.next(null)
          reject(err)
        }
      )
    })

    return promise
  }



  getTime(timestamp) {
    let now = Math.floor(new Date().getTime() / 1000)
    let time: any = now - timestamp
    // // console.log(time)
    let years = Math.floor(time / 31556926)
    time = time - (years * 31556926)
    let months = Math.floor(time / 2629743)
    time = time - (months * 2629743)
    let weeks = Math.floor(time / 604800)
    time = time - (weeks * 604800)
    let days = Math.floor(time / 86400)
    time = time - (days * 86400)
    let hours = Math.floor(time / 3600)
    time = time - (hours * 3600)
    let minutes = Math.floor(time / 60)
    time = time - (minutes * 60)
    let seconds = time

    if (years > 0) {
      time = {
        amount: years,
        label: 'years ago'
      }
    } else if (months > 0) {
      time = {
        amount: months,
        label: 'months ago'
      }
    } else if (weeks > 0) {
      time = {
        amount: weeks,
        label: 'weeks ago'
      }
    } else if (days > 0) {
      time = {
        amount: days,
        label: 'days ago'
      }
    } else if (hours > 0) {
      time = {
        amount: hours,
        label: 'hours ago'
      }
    } else if (minutes > 0) {
      time = {
        amount: minutes,
        label: 'minutes ago'
      }
    }else{
      return 'just now'
    }
    // // console.log(time)
    // // // console.log('years ' + years)
    // // // console.log('months ' + months)
    // // // console.log('weeks ' + weeks)
    // // // console.log('days ' + days)
    // // // console.log('hours ' + hours)
    // // // console.log('minutes ' + minutes)
    // // // console.log('seconds ' + seconds)
    // time.setUTCMilliseconds(timestamp)
    // let date = time.getHours()
    // // // console.log(date)

    return time.amount + ' ' + time.label
  }
}
