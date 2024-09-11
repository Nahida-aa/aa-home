# Wakatime API v1

## Authentication

### Using API Key

Most apps should use OAuth, but you can also authenticate to the WakaTime API using your secret API Key.

Using HTTP Basic Auth pass your API Key base64 encoded in the Authorization header. Don't forget to prepend Basic  to your api key after base64 encoding it.

For example, when using HTTP Basic Auth with an api key of 12345 you should add this header to your request:
Authorization: Basic MTIzNDU=

That’s because when you decode the base64 string "MTIzNDU=" you get "12345".

Alternatively, you can pass your api key as a query parameter in your request like ?api_key=XXXX.

Do NOT use your API Key on a public website. Instead, use embeddable charts and JSON.

### test

```sh
"your-api-key" -> base64 -> "eW91ci1hcGkta2V5"
```

```sh
curl -H "Authorization: Basic d2FrYV84YzNjZjYxMi00Y2ExLTRmYzAtYTM5Mi0zMDcwZDNkOGVmYzg=" "https://wakatime.com/api/v1/users/current/all_time_since_today"
```

## Resources Endpoints

### All Time Since Today

自记录以来到今天的所有时间

```sh
/api/v1/users/:user/all_time_since_today
# or
/api/v1/users/current/all_time_since_today
```
response code: 200
```json
{
  "data": {
    "daily_average": <float: average coding activity per day as seconds for the given range of time, including Other language>,
    "decimal": <string: total coding activity in decimal format>,
    "digital": <string: total coding activity in digital clock format>,
    "is_up_to_date": <boolean: true if the stats are up to date; when false, a 202 response code is returned and stats will be refreshed soon>,
    "percent_calculated": <integer: a number between 0 and 100 where 100 means the stats are up to date including Today’s time>,
    "range": {
      "end": <string: end of today as ISO 8601 UTC datetime>,
      "end_date": <string: today as Date string in YEAR-MONTH-DAY format>,
      "end_text": <string: today in human-readable format>,
      "start": <string: start of user created day as ISO 8601 UTC datetime>,
      "start_date": <string: day user was created in YEAR-MONTH-DAY format>,
      "start_text": <string: day user was created in human-readable format>,
      "timezone": <string: timezone used in Olson Country/Region format>
    }
    "text": <string: total time logged since account created as human readable string>,
    "timeout": <integer: keystroke timeout setting in minutes>,
    "total_seconds": <float: total number of seconds logged since account created>,
  }
}
```

### Summaries
```sh
/api/v1/users/:user/summaries
/api/v1/users/current/summaries
```
#### Query Parameters
```js
?start=2024-09-08&end=2024-09-09
?start=Date&end=Date
// or add
project=string
// or add
branches=string
// or add
timeout=integer
// or add
writes_only=boolean
// 
timezone=string
//
range=string
```

### Stats
```sh
/api/v1/users/:user/stats
/api/v1/users/current/stats
```
