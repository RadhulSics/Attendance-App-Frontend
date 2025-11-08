import React, { useState, useEffect } from "react";
import Layout from "../Layouts/Layout/Layout";
import { toast } from "react-toastify";
import { markAttendance } from "../services/attendanceService";

const Attendance = () => {
  const randomNames = [
    "Emma Johnson",
    "Liam Smith",
    "Olivia Brown",
    "Noah Wilson",
    "Ava Davis",
    "Isabella Miller",
    "Mason Taylor",
    "Sophia Anderson",
    "James Thomas",
  ];

  const [records, setRecords] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sText, setSText] = useState("");
  const [vTexts, setVTexts] = useState([""]);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  // Initialize Bootstrap modals
  useEffect(() => {
    const sModalEl = document.getElementById("sModal");
    const vModalEl = document.getElementById("vModal");
    if (sModalEl && vModalEl && window.bootstrap?.Modal) {
      window.sModal = new window.bootstrap.Modal(sModalEl);
      window.vModal = new window.bootstrap.Modal(vModalEl);
    }
  }, []);

  // Helper to build record format
  const createRecord = (name, data = {}) => {
    const base = records[name] || {
      name,
      date: new Date(date).toISOString(),
      attendance: { present: false, absent: false },
      specialNote: {},
      visits: [],
    };
    return { ...base, ...data };
  };

  // Function to send data to backend
  const submitToBackend = async (record) => {
  console.log("📤 Submitting:", record);
  const result = await markAttendance(record);

  if (result.success) {
    // toast.success(`✅ ${record.name}'s attendance submitted`);
  } else {
    toast.error(`❌ ${record.name} - ${result.message}`);
  }
};


  // Handle Absent / Present
  const handleAttendance = (name, status) => {
    const isPresent = status === "Present";
    const newRecord = createRecord(name, {
      attendance: {
        present: isPresent,
        absent: !isPresent,
      },
    });

    setRecords((prev) => ({ ...prev, [name]: newRecord }));
    toast.info(`${name} marked as ${status}`);
    submitToBackend(newRecord);
  };

  // Special Note modal handlers
  const handleSClick = (name) => {
    setSelectedCustomer(name);
    setSText("");
    window.sModal.show();
  };

  const handleVClick = (name) => {
    setSelectedCustomer(name);
    setVTexts([""]);
    window.vModal.show();
  };

  const handleSSave = () => {
    if (!sText.trim()) {
      toast.error("Please enter a note before saving.");
      return;
    }

    const newRecord = createRecord(selectedCustomer, {
      specialNote: { note: sText },
    });

    setRecords((prev) => ({ ...prev, [selectedCustomer]: newRecord }));
    toast.success(`Saved special note for ${selectedCustomer}`);
    submitToBackend(newRecord);
    window.sModal.hide();
  };

  const handleVSave = () => {
    const hasEmpty = vTexts.some((v) => !v.trim());
    if (hasEmpty) {
      toast.error("Please fill all visit fields before saving.");
      return;
    }

    const newRecord = createRecord(selectedCustomer, {
      visits: vTexts,
    });

    setRecords((prev) => ({ ...prev, [selectedCustomer]: newRecord }));
    toast.success(`Saved visits for ${selectedCustomer}`);
    submitToBackend(newRecord);
    window.vModal.hide();
  };

  const addVTextField = () => setVTexts([...vTexts, ""]);
  const updateVText = (index, value) => {
    const updated = [...vTexts];
    updated[index] = value;
    setVTexts(updated);
  };

  return (
    <Layout>
      {/* Date Input */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h2 className="fw-bold m-0">Attendance</h2>
        <input
          type="date"
          className="form-control"
          style={{ maxWidth: "250px" }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Attendance Table */}
      <div className="table-responsive w-100">
        <table className="table align-middle text-center table-bordered">
          <tbody>
            {randomNames.map((name, index) => (
              <tr key={index}>
                <td className="fw-semibold text-start ps-4">{name}</td>
                <td>
                  <button
                    className="btn btn-danger rounded-3 px-3 fw-bold"
                    onClick={() => handleAttendance(name, "Absent")}
                  >
                    A
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success rounded-3 px-3 fw-bold"
                    onClick={() => handleAttendance(name, "Present")}
                  >
                    P
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary rounded-3 px-3 fw-bold"
                    onClick={() => handleSClick(name)}
                  >
                    S
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning rounded-3 px-3 fw-bold text-white"
                    onClick={() => handleVClick(name)}
                  >
                    V
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* S Modal */}
      <div className="modal fade" id="sModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title">Special Note for {selectedCustomer}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Enter note..."
                value={sText}
                onChange={(e) => setSText(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={handleSSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* V Modal */}
      <div className="modal fade" id="vModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title">Visits for {selectedCustomer}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {vTexts.map((text, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Visit ${index + 1}`}
                    value={text}
                    onChange={(e) => updateVText(index, e.target.value)}
                    required
                  />
                </div>
              ))}
              <button className="btn btn-outline-primary w-100" onClick={addVTextField}>
                ➕ Add More
              </button>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={handleVSave}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
