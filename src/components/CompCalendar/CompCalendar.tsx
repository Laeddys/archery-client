import React, { FC, useMemo, useEffect, useState } from "react";
import { Calendar } from "antd";
import { ICompetition } from "../../models/ICompetition/ICompetition";
import { formatDate } from "../../utils/formatDate";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import styles from "./CompCalendar.module.css";

interface CalendarProps {
  competitionsData: { data: ICompetition[] };
}

const CompCalendar: FC<CalendarProps> = ({ competitionsData }) => {
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCompetitions(competitionsData?.data || []);
  }, [competitionsData]);

  const dateCellRender = useMemo(() => {
    const handleNavigate = (id: number) => {
      navigate(`/compInfo/${id}`);
    };
    return (value: Dayjs) => {
      const formatedDate = formatDate(value.toDate());
      const currentDayCompetitions = competitions.filter(
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
  }, [navigate, competitions]);

  return <Calendar cellRender={dateCellRender} />;
};

export default CompCalendar;
