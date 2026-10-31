
export default function UpdateProject() {
  return (
    <div className="project-ui-container">
      <div className="project-ui-header">
        <div>
          <span className="project-ui-eyebrow">PROJECT TRACKER / PROJECTS</span>
          <h2>Update Project</h2>
          <p>Review project information and update its current details.</p>
        </div>

        <span className="project-ui-badge">Project Management</span>
      </div>

      {/* Project Selection */}
      <div className="project-ui-card">
        <div className="project-ui-section-heading">
          <div>
            <h3>Select Project</h3>
            <p>Choose the project whose details you want to review.</p>
          </div>
          <span className="project-ui-step">01 / 03</span>
        </div>

        <div className="project-ui-grid">
          <div className="project-ui-field project-ui-full-width">
            <label>Project</label>
            <select defaultValue="PRJ-001">
              <option value="PRJ-001">PRJ-001 — iTASK Platform Development</option>
              <option value="PRJ-002">PRJ-002 — Dashboard UI Design</option>
              <option value="PRJ-003">PRJ-003 — AI Research and Innovation</option>
            </select>
          </div>
        </div>

        <div className="project-ui-project-summary">
          <div className="project-ui-project-icon">P</div>
          <div className="project-ui-summary-content">
            <span>PROJECT ID: PRJ-001</span>
            <h4>iTASK Platform Development</h4>
            <p>Organizational work management and intelligence platform.</p>
          </div>
          <span className="project-ui-status progress">In Progress</span>
        </div>

        <div className="project-ui-divider" />

        {/* Project Details */}
        <div className="project-ui-section-heading">
          <div>
            <h3>Project Details</h3>
            <p>Review the information and make the required changes.</p>
          </div>
          <span className="project-ui-step">02 / 03</span>
        </div>

        <div className="project-ui-grid">
          <div className="project-ui-field">
            <label>Project Name</label>
            <input
              type="text"
              defaultValue="iTASK Platform Development"
            />
          </div>

          <div className="project-ui-field">
            <label>Project Owner</label>
            <select defaultValue="Nikitha">
              <option>Nikitha</option>
              <option>Akshay</option>
              <option>Sadhvika</option>
            </select>
          </div>

          <div className="project-ui-field">
            <label>Priority</label>
            <select defaultValue="High">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="project-ui-field">
            <label>Project Status</label>
            <select defaultValue="In Progress">
              <option>Planning</option>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>On Hold</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="project-ui-field">
            <label>Start Date</label>
            <input type="date" defaultValue="2026-10-01" />
          </div>

          <div className="project-ui-field">
            <label>Target End Date</label>
            <input type="date" defaultValue="2026-12-31" />
          </div>

          <div className="project-ui-field project-ui-full-width">
            <label>Project Description</label>
            <textarea
              rows={4}
              defaultValue="Develop an organizational work management platform to help teams manage projects, track activities, monitor progress, and maintain visibility across their work."
            />
          </div>
        </div>

        {/* Progress */}
        <div className="project-ui-progress-section">
          <div className="project-ui-progress-heading">
            <div>
              <h4>Project Progress</h4>
              <p>Current overall completion</p>
            </div>
            <strong>65%</strong>
          </div>

          <div className="project-ui-progress-track">
            <div className="project-ui-progress-fill" style={{ width: "65%" }} />
          </div>
        </div>

        <div className="project-ui-info-box">
          <span className="project-ui-info-icon">i</span>
          <div>
            <strong>Project update preview</strong>
            <p>
              This screen represents how project owners can review project
              information, status, priority, and timeline in one place.
            </p>
          </div>
        </div>

        <div className="project-ui-divider" />

        <div className="project-ui-form-footer">
          <span className="project-ui-required-note">
            Project ID: <strong>PRJ-001</strong>
          </span>

          <div className="project-ui-actions">
            <button type="button" className="project-ui-button-secondary">
              Cancel
            </button>
            <button type="button" className="project-ui-button-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="project-ui-footer-note">
        <span>iTASK</span>
        <p>Organize work. Track progress. Deliver outcomes.</p>
      </div>
    </div>
  );
}
