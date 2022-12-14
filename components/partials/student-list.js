import ConceptSentence from "../partials/concept-sentence";

export default function StudentList({
  groups,
  students,
  currentTeamMembers,
  assignedStudents,
  animate,
  currentConcept,
}) {
  const currentTeamSelected = currentTeamMembers.length > 0;
  const rowClassName = animate? "row animate": "row";
  return (
    <>
    <div className="row">
      {groups.map((group) => {
        return (
          <div key={group.id} className="item students">
            <h1 className="content group-title">
              {group.name}
            </h1>
            <div className={rowClassName}>
              {students.filter((student) => student.group.id === group.id).map((student) => {
                const studentInCurrentTeam = currentTeamMembers.includes(student.id);
                const studentHide = currentTeamSelected && !studentInCurrentTeam;
                const studentHasBeenAssigned = assignedStudents.includes(student.id);
                let className = "item";
                if (studentHide) className = `${className} hide`;
                if (studentInCurrentTeam) className = `${className} current-team-member`;
                if (studentHasBeenAssigned) className = `${className} assigned-student`;
                return (
                  <div key={student.id} className={className}>
                    <div className="content">{student.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
      {currentConcept ? <ConceptSentence concept={currentConcept} /> : null}
    </>
  );
}
