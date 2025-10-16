"use client"

import { useState, useEffect } from "react";

import { Calendar, CalendarDayButton } from "@/components/ui";
import { format } from 'date-fns'
import { ko } from 'date-fns/locale';

function ReservationGolfPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const [getDate, setGetDate] = useState<any[]>([])

  const dateFilter = (date: string, openedCnt: number) => {
    if (date === 'CLOSED') {
      return '마감'
    } else if (date === 'NOT_OPEN') {
      return '오픈전'
    } else if (date === 'ON_OPEN') {
      if(openedCnt > 20) {
        return '여유'
      } else if(openedCnt < 20) {
        return '임박'
      }
    }
  }


  useEffect(() => {
    const data = [
      {
          "idx": 36665,
          "date": "2025-10-01",
          "wclWeek": 4,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36666,
          "date": "2025-10-02",
          "wclWeek": 5,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36667,
          "date": "2025-10-03",
          "wclWeek": 6,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36668,
          "date": "2025-10-04",
          "wclWeek": 7,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36669,
          "date": "2025-10-05",
          "wclWeek": 1,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36670,
          "date": "2025-10-06",
          "wclWeek": 2,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36671,
          "date": "2025-10-07",
          "wclWeek": 3,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36672,
          "date": "2025-10-08",
          "wclWeek": 4,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36673,
          "date": "2025-10-09",
          "wclWeek": 5,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36674,
          "date": "2025-10-10",
          "wclWeek": 6,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36675,
          "date": "2025-10-11",
          "wclWeek": 7,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36676,
          "date": "2025-10-12",
          "wclWeek": 1,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36677,
          "date": "2025-10-13",
          "wclWeek": 2,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36678,
          "date": "2025-10-14",
          "wclWeek": 3,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36679,
          "date": "2025-10-15",
          "wclWeek": 4,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 0,
          "calendarStatus": "CLOSED"
      },
      {
          "idx": 36680,
          "date": "2025-10-16",
          "wclWeek": 5,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 16,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36681,
          "date": "2025-10-17",
          "wclWeek": 6,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 32,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36682,
          "date": "2025-10-18",
          "wclWeek": 7,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 38,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36683,
          "date": "2025-10-19",
          "wclWeek": 1,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 35,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36684,
          "date": "2025-10-20",
          "wclWeek": 2,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 9,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36685,
          "date": "2025-10-21",
          "wclWeek": 3,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 31,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36686,
          "date": "2025-10-22",
          "wclWeek": 4,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 35,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36687,
          "date": "2025-10-23",
          "wclWeek": 5,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 44,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36688,
          "date": "2025-10-24",
          "wclWeek": 6,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 32,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36689,
          "date": "2025-10-25",
          "wclWeek": 7,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 30,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36690,
          "date": "2025-10-26",
          "wclWeek": 1,
          "golfWorkCode": "2",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 35,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36691,
          "date": "2025-10-27",
          "wclWeek": 2,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 3,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36692,
          "date": "2025-10-28",
          "wclWeek": 3,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 33,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36693,
          "date": "2025-10-29",
          "wclWeek": 4,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 42,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36694,
          "date": "2025-10-30",
          "wclWeek": 5,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 56,
          "calendarStatus": "ON_OPEN"
      },
      {
          "idx": 36695,
          "date": "2025-10-31",
          "wclWeek": 6,
          "golfWorkCode": "1",
          "displayName": null,
          "etcCmt": null,
          "openedCnt": 46,
          "calendarStatus": "ON_OPEN"
      }
  ]
    setGetDate(data)
  }, [])

  console.log(`date`, date);

  return (
    <div>
      {/* <h1>Reservation Golf</h1>
      <div>
        { date && <p>{date.toLocaleDateString()}</p> }
      </div> */}


      <div className="container">
        <div className="flex">
          <Calendar mode="single" 
            selected={date} 
            onSelect={setDate} locale={ko}
            showOutsideDays={false}
            components={{
              DayButton: ({ children, modifiers, day, ...props }) => {
                console.log(`day:`, format(day.date, 'yyyy-MM-dd'))
                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}              
                    <span>{ dateFilter(getDate.find(item => item.date === format(day.date, 'yyyy-MM-dd'))?.calendarStatus, getDate.find(item => item.date === format(day.date, 'yyyy-MM-dd'))?.openedCnt) }</span>
                  </CalendarDayButton>
                )
              },
            }}
            disabled={{
              before: new Date(),
            }}
          />

        </div>

      </div>



      
    </div>
  )
}

export default ReservationGolfPage;