import React, { FC, useEffect, useState } from "react";
import { Input, Button, Form, Spin, notification, Alert, Card } from "antd";
import { IClub } from "../../models/Club/IClub";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createClub, fetchClubs } from "../../store/reducers/clubs/clubSlice";
import { rules } from "../../utils/rules";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";

const CreateClub: FC = () => {
  const [clubData, setClubData] = useState<IClub>({
    id: 0,
    name: "",
    established: 2025,
    legal_form: "",
    registration_number: "",
    bank: "",
    legal_address: "",
    filial_branch: "",
    manager: "",
    coach_staff: [""],
    phone: "",
    mail: "",
    website: "",
    socialMedia: "",
    notes: "",
    athletes_count: 0,
    trainingInSummer: "",
    trainingInWinter: "",
  });
  const [form] = Form.useForm();

  const { clubs, isLoading, error } = useAppSelector(
    (state) => state.clubSlice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (clubs.length === 0) {
      dispatch(fetchClubs());
    }
  }, [dispatch, clubs]);

  const handleCreateClub = async () => {
    try {
      await dispatch(createClub(clubData)).unwrap();

      notification.success({
        message: "Success!",
        description: "Club created successfully!.",
        placement: "topRight",
      });

      form.resetFields();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Card>
      {error && (
        <Alert
          style={{ marginBottom: "10px" }}
          message={error}
          type="error"
          showIcon
        />
      )}
      <Title>Create Club</Title>
      <Spin spinning={isLoading}>
        <Form form={form} layout="vertical" onFinish={handleCreateClub}>
          <div>
            <Form.Item label="Name" name="name" rules={[rules.required()]}>
              <Input
                type="text"
                placeholder="Name"
                value={clubData.name}
                onChange={(e) =>
                  setClubData({
                    ...clubData,
                    name: e.target.value
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" "),
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Established"
              name="established"
              rules={[
                rules.required(),
                {
                  validator: (_, value) => {
                    if (!value || /^\d+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Enter a valid year (e.g., 2024)!")
                    );
                  },
                },
              ]}
            >
              <Input
                placeholder="Established"
                style={{ width: "100%" }}
                value={clubData.established}
                type="text"
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    established: parseInt(event.target.value),
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Legal form:"
              name="legal_form"
              rules={[rules.required()]}
            >
              <Input
                placeholder="Legal form"
                style={{ width: "100%" }}
                value={clubData.legal_form}
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    legal_form: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Registration number:"
              name="registration_number"
              rules={[rules.required()]}
            >
              <Input
                placeholder="registration number"
                style={{ width: "100%" }}
                value={clubData.registration_number}
                type="text"
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    registration_number: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item label="Bank:" name="bank" rules={[rules.required()]}>
              <Input
                type="text"
                placeholder="Bank"
                value={clubData.bank}
                onChange={(e) =>
                  setClubData({
                    ...clubData,
                    bank: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Legal address:"
              name="legal_address"
              rules={[rules.required()]}
            >
              <Input
                placeholder="legal address"
                style={{ width: "100%" }}
                value={clubData.legal_address}
                type="text"
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    legal_address: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Filial branch:"
              name="filial_branch"
              rules={[rules.required()]}
            >
              <Input
                placeholder="Filial branch"
                style={{ width: "100%" }}
                value={clubData.filial_branch}
                type="text"
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    filial_branch: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Manager:"
              name="manager"
              rules={[rules.required()]}
            >
              <Input
                placeholder="Manager"
                style={{ width: "100%" }}
                value={clubData.manager}
                type="text"
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    manager: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Coach staff:"
              name="coach_staff"
              rules={[rules.required()]}
            >
              <Input
                placeholder="Coach staff (may be several, comma separated)"
                style={{ width: "100%" }}
                value={clubData.coach_staff.join(", ")}
                type="text"
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    coach_staff: event.target.value
                      .split(/\s*,\s*/)
                      .filter((name) => name !== ""),
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Phone number:"
              name="phone"
              rules={[rules.required()]}
            >
              <Input
                placeholder="Phone number"
                style={{ width: "100%" }}
                value={clubData.phone}
                type="text"
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    phone: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Email:"
              name="mail"
              rules={[
                rules.required(),
                { type: "email", message: "The input is not a valid email!" },
              ]}
            >
              <Input
                placeholder="eMail"
                style={{ width: "100%" }}
                value={clubData.mail}
                type="email"
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    mail: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item label="Website:" name="website">
              <Input
                placeholder="Website"
                style={{ width: "100%" }}
                value={clubData.website}
                type="text"
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    website: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item label="Notes:" name="notes">
              <TextArea
                placeholder="Notes"
                style={{ width: "100%" }}
                value={clubData.notes}
                onChange={(event) =>
                  setClubData({
                    ...clubData,
                    notes: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create Club
            </Button>
          </div>
        </Form>
      </Spin>
    </Card>
  );
};

export default CreateClub;
