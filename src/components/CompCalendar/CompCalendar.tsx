import { Calendar } from "antd";
import React, { FC, useMemo } from "react";
import { ICompetition } from "../../models/ICompetition/ICompetition";
import { formatDate } from "../../utils/formatDate";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../router/routes";
import styles from "./CompCalendar.module.css";

interface CalendarProps {
  competitions: ICompetition[];
}

const CompCalendar: FC<CalendarProps> = (props) => {
  const navigate = useNavigate();

  const dateCellRender = useMemo(() => {
    const handleNavigate = (id: number) => {
      navigate(`/compInfo/${id}`);
    };
    return (value: Dayjs) => {
      const formatedDate = formatDate(value.toDate());
      const currentDayCompetitions = props.competitions.filter(
        (comp) => comp.dateStart === formatedDate
      );

      return (
        <div className={styles.cell}>
          {currentDayCompetitions.map((comp, index) => (
            <div
              onClick={() => handleNavigate(comp.id)}
              key={index}
              className={styles.competition}
            >
              {comp.name}
            </div>
          ))}
        </div>
      );
    };
  }, [navigate, props.competitions]);

  return <Calendar cellRender={dateCellRender} />;
};

export default CompCalendar;
