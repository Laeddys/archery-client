import { Calendar } from "antd";
import React, { FC } from "react";
import { ICompetition } from "../models/ICompetition/ICompetition";
import { formatDate } from "../utils/formatDate";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router/routes";

interface CalendarProps {
  competitions: ICompetition[];
}

const CompCalendar: FC<CalendarProps> = (props) => {
  const navigate = useNavigate();
  const dateCellRender = (value: Dayjs) => {
    const formatedDate = formatDate(value.toDate());
    const currentDayCompetitions = props.competitions.filter(
      (comp) => comp.dateStart === formatedDate
    );

    return (
      <div>
        {currentDayCompetitions.map((comp, index) => (
          <div
            onClick={() => {
              navigate(RouteNames.PROFILE);
            }}
            key={index}
          >
            {comp.name} <p key={index}>{comp.format}</p>
          </div>
        ))}
      </div>
    );
  };
  return <Calendar cellRender={dateCellRender} />;
};

export default CompCalendar;
