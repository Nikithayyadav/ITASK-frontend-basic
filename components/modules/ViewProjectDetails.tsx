
export default function ViewProjectDetails() {
  return (
    <div className="project-ui-container">
      {/* Page Header */}
      <div className="project-ui-header">
        <div>
          <span className="project-ui-eyebrow">
            PROJECT TRACKER / PROJECTS / DETAILS
          </span>
          <h2>Project Details</h2>
          <p>View project information, progress, team members, and activities.</p>
        </div>

        <span className="project-ui-badge">Project Overview</span>
      </div>

      {/* Project Overview */}
      <div className="project-ui-card">
        <div className="project-ui-project-summary">
          <div className="project-ui-project-icon">P</div>

          <div className="project-ui-summary-content">
            <span>PROJECT ID: PRJ-001</span>
            <h4>iTASK Platform Development</h4>
            <p>
              An organizational work management platform designed to improve
              visibility, coordination, and project tracking.
            </p>
          </div>

          <span className="project-ui-status progress">In Progress</span>
        </div>

        {/* KPI Cards */}
        <div className="project-ui-details-stats">
          <div className="project-ui-stat-card">
            <span className="project-ui-stat-label">Overall Progress</span>
            <h3>65%</h3>
            <div className="project-ui-progress-track">
              <div
                className="project-ui-progress-fill"
                style={{ width: "65%" }}
              />
            </div>
          </div>

          <div className="project-ui-stat-card">
            <span className="project-ui-stat-label">Project Priority</span>
            <h3 className="project-ui-priority">High</h3>
            <p>Requires regular monitoring</p>
          </div>

          <div className="project-ui-stat-card">
            <span className="project-ui-stat-label">Team Members</span>
            <h3>06</h3>
            <p>Assigned to this project</p>
          </div>

          <div className="project-ui-stat-card">
            <span className="project-ui-stat-label">Days Remaining</span>
            <h3>63</h3>
            <p>Until target completion</p>
          </div>
        </div>

        <div className="project-ui-divider" />

        {/* Details and Timeline */}
        <div className="project-ui-details-grid">
          <section className="project-ui-detail-section">
            <div className="project-ui-section-heading">
              <div>
                <h3>Project Information</h3>
                <p>Essential project details</p>
              </div>
            </div>

            <div className="project-ui-detail-list">
              <div className="project-ui-detail-row">
                <span>Project Owner</span>
                <strong>Nikitha</strong>
              </div>

              <div className="project-ui-detail-row">
                <span>Department</span>
                <strong>Technology</strong>
              </div>

              <div className="project-ui-detail-row">
                <span>Start Date</span>
                <strong>01 Oct 2026</strong>
              </div>

              <div className="project-ui-detail-row">
                <span>Target End Date</span>
                <strong>31 Dec 2026</strong>
              </div>

              <div className="project-ui-detail-row">
                <span>Current Status</span>
                <strong className="project-ui-status-text">In Progress</strong>
              </div>
            </div>
          </section>

          <section className="project-ui-detail-section">
            <div className="project-ui-section-heading">
              <div>
                <h3>Project Timeline</h3>
                <p>Key stages and milestones</p>
              </div>
            </div>

            <div className="project-ui-timeline">
              <div className="project-ui-timeline-item completed">
                <span className="project-ui-timeline-dot">✓</span>
                <div>
                  <strong>Project Planning</strong>
                  <p>Goals and requirements defined</p>
                  <span>01 Oct 2026</span>
                </div>
              </div>

              <div className="project-ui-timeline-item completed">
                <span className="project-ui-timeline-dot">✓</span>
                <div>
                  <strong>UI Design & Development</strong>
                  <p>Design and screen development underway</p>
                  <span>October 2026</span>
                </div>
              </div>

              <div className="project-ui-timeline-item active">
                <span className="project-ui-timeline-dot">3</span>
                <div>
                  <strong>Integration & Review</strong>
                  <p>Planned review and integration stage</p>
                  <span>Upcoming</span>
                </div>
              </div>

              <div className="project-ui-timeline-item">
                <span className="project-ui-timeline-dot">4</span>
                <div>
                  <strong>Final Delivery</strong>
                  <p>Final review and project completion</p>
                  <span>31 Dec 2026</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="project-ui-divider" />

        {/* Team Members */}
        <div className="project-ui-section-heading">
          <div>
            <h3>Project Team</h3>
            <p>People involved in this project</p>
          </div>

          <span className="project-ui-step">06 MEMBERS</span>
        </div>

        <div className="project-ui-team-list">
          <div className="project-ui-team-member">
            <div className="project-ui-avatar">N</div>
            <div>
              <strong>Nikitha</strong>
              <span>Project Owner</span>
            </div>
            <span className="project-ui-member-status">Owner</span>
          </div>

          <div className="project-ui-team-member">
            <div className="project-ui-avatar">A</div>
            <div>
              <strong>Akshay</strong>
              <span>Team Member</span>
            </div>
            <span className="project-ui-member-status">Active</span>
          </div>

          <div className="project-ui-team-member">
            <div className="project-ui-avatar">S</div>
            <div>
              <strong>Sadhvika</strong>
              <span>Team Member</span>
            </div>
            <span className="project-ui-member-status">Active</span>
          </div>
        </div>

        {/* Footer */}
        <div className="project-ui-divider" />

        <div className="project-ui-form-footer">
          <span className="project-ui-required-note">
            Last reviewed: 29 Oct 2026
          </span>

          <div className="project-ui-actions">
            <button type="button" className="project-ui-button-secondary">
              Back to Projects
            </button>

            <button type="button" className="project-ui-button-primary">
              Edit Project
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
