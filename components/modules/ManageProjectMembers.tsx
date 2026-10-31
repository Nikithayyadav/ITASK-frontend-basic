
export default function ManageProjectMembers() {
  const members = [
    {
      initials: "N",
      name: "Nikitha",
      role: "Project Owner",
      department: "Technology",
      status: "Owner",
    },
    {
      initials: "A",
      name: "Akshay",
      role: "Reviewer",
      department: "Technology",
      status: "Active",
    },
    {
      initials: "S",
      name: "Sadhvika",
      role: "Contributor",
      department: "Technology",
      status: "Active",
    },
    {
      initials: "S",
      name: "Sathvik",
      role: "Contributor",
      department: "Technology",
      status: "Active",
    },
    {
      initials: "M",
      name: "Malavika",
      role: "Contributor",
      department: "Technology",
      status: "Active",
    },
    {
      initials: "S",
      name: "Suchith",
      role: "Contributor",
      department: "Technology",
      status: "Active",
    },
  ];

  return (
    <div className="project-ui-container">
      {/* Page Header */}
      <div className="project-ui-header">
        <div>
          <span className="project-ui-eyebrow">
            PROJECT TRACKER / PROJECTS / TEAM
          </span>
          <h2>Manage Project Members</h2>
          <p>
            Organize your project team, review responsibilities, and manage
            member assignments.
          </p>
        </div>

        <span className="project-ui-badge">Team Management</span>
      </div>

      {/* Project Summary */}
      <div className="project-ui-card">
        <div className="project-ui-project-summary">
          <div className="project-ui-project-icon">P</div>

          <div className="project-ui-summary-content">
            <span>PROJECT ID: PRJ-001</span>
            <h4>iTASK Platform Development</h4>
            <p>Manage the people working on this project.</p>
          </div>

          <span className="project-ui-status progress">In Progress</span>
        </div>

        {/* Team Summary */}
        <div className="project-ui-details-stats">
          <div className="project-ui-stat-card">
            <span className="project-ui-stat-label">Total Members</span>
            <h3>06</h3>
            <p>Assigned to the project</p>
          </div>

          <div className="project-ui-stat-card">
            <span className="project-ui-stat-label">Project Owner</span>
            <h3 className="project-ui-member-stat">01</h3>
            <p>Responsible for project oversight</p>
          </div>

          <div className="project-ui-stat-card">
            <span className="project-ui-stat-label">Reviewers</span>
            <h3 className="project-ui-member-stat">01</h3>
            <p>Review project activities</p>
          </div>

          <div className="project-ui-stat-card">
            <span className="project-ui-stat-label">Contributors</span>
            <h3 className="project-ui-member-stat">04</h3>
            <p>Contribute to project tasks</p>
          </div>
        </div>

        <div className="project-ui-divider" />

        {/* Member List Header */}
        <div className="project-ui-section-heading project-ui-members-heading">
          <div>
            <h3>Project Team Members</h3>
            <p>Review assigned members and their responsibilities.</p>
          </div>

          <button type="button" className="project-ui-button-primary">
            + Add Member
          </button>
        </div>

        {/* Member Table */}
        <div className="project-ui-table-wrapper">
          <table className="project-ui-table">
            <thead>
              <tr>
                <th>TEAM MEMBER</th>
                <th>ROLE</th>
                <th>DEPARTMENT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member, index) => (
                <tr key={`${member.name}-${index}`}>
                  <td>
                    <div className="project-ui-table-member">
                      <div className="project-ui-avatar">
                        {member.initials}
                      </div>

                      <div>
                        <strong>{member.name}</strong>
                        <span>Project member</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="project-ui-role">{member.role}</span>
                  </td>

                  <td>{member.department}</td>

                  <td>
                    <span
                      className={`project-ui-member-status ${
                        member.status === "Owner" ? "owner" : ""
                      }`}
                    >
                      <span className="project-ui-status-dot" />
                      {member.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="project-ui-action-link"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Role Information */}
        <div className="project-ui-info-box">
          <span className="project-ui-info-icon">i</span>

          <div>
            <strong>Project roles and responsibilities</strong>
            <p>
              The project owner oversees overall delivery, reviewers assess
              progress, and contributors work on assigned project activities.
              Clear role allocation helps maintain accountability.
            </p>
          </div>
        </div>

        <div className="project-ui-divider" />

        {/* Footer */}
        <div className="project-ui-form-footer">
          <span className="project-ui-required-note">
            Showing <strong>6</strong> project members
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
