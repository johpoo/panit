package model

// ProjectUserStorer is the interface to store project users.
type ProjectUserStorer interface {
	GetProjectUsers(projID string) ([]ProjectUser, error)
	GetUserProjects(userID string) ([]Project, error)
	GetProjectUser(projID, userID string) (*ProjectUser, error)
	AssignProjectUser(ProjectUser) (*ProjectUser, error)
	RevokeProjectUser(ProjectUser) error
	UpdateProjectUser(ProjectUser) (*ProjectUser, error)
	GetUserProjectRoles(projID string) ([]ProjectUser, error)
}

type ProjectUser struct {
	User
	ID        string `json:"id,omitempty"` // omit embed field from User
	ProjectID string `db:"project_id" json:"project_id"`
	UserID    string `db:"user_id" json:"user_id"`
	Role      string `db:"role" json:"role"`
}
