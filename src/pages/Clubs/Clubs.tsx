import React, { useEffect, useState } from "react";
import { Collapse, Spin, Alert, Table } from "antd";
import { fetchClubs } from "../../store/reducers/clubs/clubSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const pageSize = 30;

const Clubs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clubs, isLoading, error } = useAppSelector(
    (state) => state.clubSlice
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (clubs.length === 0) {
      dispatch(fetchClubs({ page: 1, limit: 30 }));
    }
  }, [dispatch, clubs.length]);

  const paginatedClubs = clubs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: "Legal form", dataIndex: "legal_form", key: "legal_form" },
    {
      title: "Registration number",
      dataIndex: "registration_number",
      key: "registration_number",
    },
    { title: "Bank", dataIndex: "bank", key: "bank" },
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
    { title: "Manager", dataIndex: "manager", key: "manager" },
    { title: "Members", dataIndex: "athletes_count", key: "athletes_count" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Mail", dataIndex: "mail", key: "mail" },
    { title: "Notes", dataIndex: "notes", key: "notes" },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text: string) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ) : (
          "-"
        ),
    },
  ];

  const items = paginatedClubs.map((club) => ({
    key: club.id.toString(),
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <strong>{club.name}</strong> - {club.established} (Manager:{" "}
          {club.manager} ) {club.legal_address}
        </span>
      </div>
    ),
    children: (
      <Table
        columns={columns}
        dataSource={[club]}
        rowKey="id"
        pagination={false}
        scroll={{ x: "90%" }}
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

      <div className="custom-pagination">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        <div className="page-numbers">
          {Array.from(
            { length: Math.ceil(clubs.length / pageSize) },
            (_, index) => (
              <button
                key={index}
                className={`page-number ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>

        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(clubs.length / pageSize)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Clubs;
