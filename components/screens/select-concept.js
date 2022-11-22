import { useState } from "react";
import {
  FINAL_STATE_ACTION_TEXT,
  FINAL_STATE_NEXT,
  RERUN_CONCEPT_ACTION_ID,
  RERUN_CONCEPT_ACTION_TEXT
} from "../../config";
import { makeConcept } from "../../helpers";
import SessionAction from "../partials/session-action";
import StudentList from "../partials/student-list";
import Screen from "../screens/screen-layout";

export default function SelectConcept({
  session,
  data,
  teams,
  setTeams,
  assignedStudents,
  setAssignedStudents,
  currentTeamMembers,
  setCurrentTeamMembers,
  stateDescriptor,
  transitionToStateFn,
}) {

  const [concept, setConcept] = useState(makeConcept(data.prompt_companies, data.prompt_ideas));
  const isLastTeam = teams.length === data.distribution.length - 1;
  const nextState = isLastTeam ? FINAL_STATE_NEXT : stateDescriptor.next;
  const nextText = isLastTeam ? FINAL_STATE_ACTION_TEXT : stateDescriptor.action.text;

  const rerunConceptId = RERUN_CONCEPT_ACTION_ID;
  const rerunConceptText = RERUN_CONCEPT_ACTION_TEXT;

  function actionHandler() {
    setTeams([...teams, { students: currentTeamMembers, concept }]);
    setAssignedStudents([...assignedStudents, ...currentTeamMembers]);
    setCurrentTeamMembers([]);
    transitionToStateFn(nextState);
  }

  function rerunConceptHandler() {
    setConcept(makeConcept(data.prompt_companies, data.prompt_ideas));
  }

  return (
    <Screen>
      <StudentList
          groups={data.groups}
          students={data.students}
          currentTeamMembers={currentTeamMembers}
          assignedStudents={assignedStudents}
          currentConcept={concept}
      />
      <SessionAction
        handler={actionHandler}
        id={stateDescriptor.action.id}
        text={nextText}
        disabled={stateDescriptor.action.disabled}
        cycleBackground={stateDescriptor.cycleBackground}
      />
      <SessionAction
        handler={rerunConceptHandler}
        id={rerunConceptId}
        text={rerunConceptText}
        disabled={false}
        cycleBackground={null}
      />
    </Screen>
  );
}
