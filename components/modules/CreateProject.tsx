
export default function CreateProject() {
  return (
    <div className="project-ui-container">
      <div className="project-ui-header">
        <div>
          <h2>Create New Project</h2>
    
        </div>

        <span className="project-ui-badge">New Project</span>
      </div>

      <div className="project-ui-card">
        <div className="project-ui-section-heading">
          <div>
            <h3>Project Information</h3>
            <p>Enter the basic details of your project.</p>
          </div>
          <span className="project-ui-step">01 / 03</span>
        </div>

        <div className="project-ui-grid">
          <div className="project-ui-field">
            <label>Project Name <span>*</span></label>
            <input type="text" placeholder="e.g. iTASK Platform Development" />
          </div>

          <div className="project-ui-field">
            <label>Project Code</label>
            <input type="text" placeholder="e.g. PRJ-001" />
          </div>

          <div className="project-ui-field">
            <label>Project Owner <span>*</span></label>
            <select defaultValue="">
              <option value="" disabled>Select project owner</option>
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

          <div className="project-ui-field project-ui-full-width">
            <label>Project Description</label>
            <textarea
              rows={4}
              placeholder="Describe the purpose, goals, and expected outcomes of this project..."
            />
          </div>
        </div>

        <div className="project-ui-divider" />

        <div className="project-ui-section-heading">
          <div>
            <h3>Timeline & Planning</h3>
            <p>Define the expected project schedule and initial status.</p>
          </div>
          <span className="project-ui-step">02 / 03</span>
        </div>

        <div className="project-ui-grid">
          <div className="project-ui-field">
            <label>Start Date</label>
            <input type="date" />
          </div>

          <div className="project-ui-field">
            <label>Target End Date</label>
            <input type="date" />
          </div>

          <div className="project-ui-field">
            <label>Initial Status</label>
            <select defaultValue="Planning">
              <option>Planning</option>
              <option>Not Started</option>
              <option>In Progress</option>
            </select>
          </div>

          <div className="project-ui-field">
            <label>Department / Team</label>
            <select defaultValue="">
              <option value="" disabled>Select team</option>
              <option>Technology</option>
              <option>Business</option>
              <option>AI & Innovation</option>
            </select>
          </div>
        </div>

        <div className="project-ui-info-box">
          <span className="project-ui-info-icon">i</span>
          <div>
            <strong>Before creating the project</strong>
            <p>
              Review the project details, ownership, and timeline to ensure
              everyone starts with a clear understanding of the objectives.
            </p>
          </div>
        </div>

        <div className="project-ui-divider" />

        <div className="project-ui-form-footer">
          <span className="project-ui-required-note">
            <span>*</span> Required fields
          </span>

          <div className="project-ui-actions">
            <button type="button" className="project-ui-button-secondary">
              Cancel
            </button>
            <button type="button" className="project-ui-button-primary">
              + Create Project
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
