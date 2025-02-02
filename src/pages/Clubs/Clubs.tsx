import React, { useEffect } from "react";
import { Collapse, Spin, Alert, Table } from "antd";
import { fetchClubs } from "../../store/reducers/clubs/clubSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Clubs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clubs, isLoading, error } = useAppSelector(
    (state) => state.clubSlice
  );

  useEffect(() => {
    if (clubs.length === 0) {
      dispatch(fetchClubs());
    }
  }, [dispatch, clubs.length]);

  const columns = [
    {
      title: "Legal form",
      dataIndex: "legal_form",
      key: "legal_form",
    },
    {
      title: "Registration number",
      dataIndex: "registration_number",
      key: "registration_number",
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
    },
    {
      title: "Legal address",
      dataIndex: "legal_address",
      key: "legal_address",
    },
    {
      title: "Filial branch",
      dataIndex: "filial_branch",
      key: "filial_branch",
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Coach staff",
      dataIndex: "coach_staff",
      key: "coach_staff",
      render: (text: string) => {
        try {
          const coachStaff = JSON.parse(text);
          return (
            <ul>
              {coachStaff.map((coach: string, index: number) => (
                <li key={index}>{coach}</li>
              ))}
            </ul>
          );
        } catch (error) {
          return <span>Error parsing data</span>;
        }
      },
    },
    {
      title: "Members",
      dataIndex: "athletes_count",
      key: "athletes_count",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Mail",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
  ];

  const items = clubs.map((club) => ({
    key: club.id.toString(),
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <strong>{club.name}</strong> - {club.established} (Manager:{" "}
          {club.manager})
        </span>
      </div>
    ),
    children: (
      <Table
        columns={columns}
        dataSource={[club]}
        rowKey="id"
        pagination={false}
        size="small"
      />
    ),
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Clubs</h2>

      {isLoading && (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      )}

      {error && (
        <Alert type="error" message={error} style={{ marginBottom: "20px" }} />
      )}

      {!isLoading && !error && clubs.length > 0 && (
        <Collapse accordion items={items} />
      )}

      {!isLoading && !error && clubs.length === 0 && (
        <Alert type="info" message="No clubs found." />
      )}
    </div>
  );
};

export default Clubs;
