import SessionAction from "../partials/session-action";
import TeamList from "../partials/team-list";
import Screen from "../screens/screen-layout";

export default function ShowTeams({
  session,
  data,
  teams,
  setTeams,
  stateDescriptor,
  transitionToStateFn,
  setAssignedStudents,
}) {

  function actionHandler() {
    setAssignedStudents([]);
    setTeams([]);
    transitionToStateFn(stateDescriptor.next);
  }

  return (
    <Screen>
      <TeamList
        teams={teams}
        groups={data.groups}
        students={data.students}
      />
      <SessionAction
        handler={actionHandler}
        id={stateDescriptor.action.id}
        text={stateDescriptor.action.text}
        disabled={stateDescriptor.action.disabled}
        cycleBackground={stateDescriptor.cycleBackground}
      />
    </Screen>
  );
}
