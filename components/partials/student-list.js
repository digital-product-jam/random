export default function StudentList({ groups, students, selected, assigned }) {

  const selectionsMade = selected.length > 0;

  return (
    <div className="row">
      {groups.map(group => {
        return <div key={group.id} className="item students">
          <h1 className="content">{group.name}</h1>
          <div className="row">
            {students.filter(student => student.group.id === group.id).map(student => {
              const studentInSelection = selected.includes(student.id);
              const studentHide = selectionsMade && !studentInSelection;
              const studentAssigned = assigned.includes(student.id);
              let className = "item";
              if (studentHide) { className = `${className} hide` }
              if (studentInSelection) { className = `${className} selected` }
              if (studentAssigned) { className = `${className} assigned` }
              return <div key={student.id} className={className}><div className="content">{student.name}</div></div>
            })}
          </div>
        </div>
      })}
    </div>
  )
}