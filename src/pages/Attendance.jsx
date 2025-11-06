import React, { useState, useEffect } from "react";
import Layout from "../Layouts/Layout/Layout";
import { toast } from "react-toastify";

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

  const [attendance, setAttendance] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sText, setSText] = useState("");
  const [vTexts, setVTexts] = useState([""]);

  // Bootstrap modal refs
  useEffect(() => {
    const sModalEl = document.getElementById("sModal");
    const vModalEl = document.getElementById("vModal");
    if (sModalEl && vModalEl && window.bootstrap?.Modal) {
      window.sModal = new window.bootstrap.Modal(sModalEl);
      window.vModal = new window.bootstrap.Modal(vModalEl);
    }
  }, []);

  const handleAttendance = (name, status) => {
    setAttendance((prev) => ({ ...prev, [name]: { status } }));
    toast.info(`${name} marked as ${status}`, { icon: "✅" });
    console.log("Attendance Updated:", { ...attendance, [name]: { status } });
  };

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

  // 🟢 Validate before saving S
  const handleSSave = () => {
    if (!sText.trim()) {
      toast.error("Please enter a note before saving.");
      return;
    }
    setAttendance((prev) => ({
      ...prev,
      [selectedCustomer]: { status: "S", note: sText },
    }));
    toast.success(`Saved special note for ${selectedCustomer}`);
    console.log("Attendance Updated:", {
      ...attendance,
      [selectedCustomer]: { status: "S", note: sText },
    });
    window.sModal.hide();
  };

  // 🟢 Validate before saving V
  const handleVSave = () => {
    const hasEmptyField = vTexts.some((t) => !t.trim());
    if (hasEmptyField) {
      toast.error("Please fill in all visit fields before submitting.");
      return;
    }
    setAttendance((prev) => ({
      ...prev,
      [selectedCustomer]: { status: "V", notes: vTexts },
    }));
    toast.success(`Saved visit details for ${selectedCustomer}`);
    console.log("Attendance Updated:", {
      ...attendance,
      [selectedCustomer]: { status: "V", notes: vTexts },
    });
    window.vModal.hide();
  };

  const addVTextField = () => setVTexts([...vTexts, ""]);

  const updateVText = (index, value) => {
    const newTexts = [...vTexts];
    newTexts[index] = value;
    setVTexts(newTexts);
  };

  return (
    <Layout>
      <h2 className="text-center fw-bold mb-4">Attendance</h2>
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

      {/* --- S Modal --- */}
      <div
        className="modal fade"
        id="sModal"
        tabIndex="-1"
        aria-labelledby="sModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title" id="sModalLabel">
                Special Note for {selectedCustomer}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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

      {/* --- V Modal --- */}
      <div
        className="modal fade"
        id="vModal"
        tabIndex="-1"
        aria-labelledby="vModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title" id="vModalLabel">
                Visits for {selectedCustomer}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
              <button
                className="btn btn-outline-primary w-100"
                onClick={addVTextField}
              >
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
