
// Objects :

const courseInfo = {  id: 100,  name: "Mathematics"};

const assignmentGroup = {
  id: 200,
  name: "Fundamentals of Mathematics",
  course_id: 100,
  group_weight: 50,
  assignments: [
    { id: 1, name: "Algebra", due_at: "2024-03-15", points_possible: 100 },
    { id: 2, name: "Analysis", due_at: "2024-05-22", points_possible: 150 },
    { id: 3, name: "Statistics", due_at: "2125-07-10", points_possible: 200 }]};

const learnerSubmissions = [
  { learner_id: 1010, assignment_id: 1, submission: { submitted_at: "2024-03-10", score: 55, } },
  { learner_id: 1010, assignment_id: 2, submission: { submitted_at: "2024-05-29", score: 70, } },
  { learner_id: 1010, assignment_id: 3, submission: { submitted_at: "2024-07-02", score: 160, } },
  { learner_id: 1011, assignment_id: 1, submission: { submitted_at: "2024-04-30", score: 44, } },
  { learner_id: 1011, assignment_id: 3, submission: { submitted_at: "2024-06-27", score: 130, } },];

//Functions: 

// 1 - If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error
function mismatchingId(courseInfo, assignmentGroup) {
  if (courseInfo.id !== assignmentGroup.course_id) {
    throw new Error(` Assignment Goup ${assignmentGroup.id} is INVALID for the cours ${courseInfo.id} `);
  }
};

// 2 - You should also account for potential errors in the data that your program receives.
function potentialError(assignment) {
  switch (true) {
    //What if points_possible is 0?You cannot divide by zero
    case assignment.points_possible === 0:
      throw new Error(`Assignment ${assignment.id} has 0 possible points.`);
    //What if a value that you are expecting to be a number is instead a string?
    case typeof assignment.points_possible !== 'number':
      throw new Error(`Invalid data type for points_possible in assignment ${assignment.id}.`);

    default: break;
  }
}

// 3 - Creat function calculate the average scores 
function Average(lersubm, assignmentGroup) {
  let totalScore = 0;
  let totalPointsPossible = 0;
  const now = new Date();

  lersubm.forEach(submission => {
    const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);
    //If an assignment is not yet due, do not include it in the results or the average.
    if (new Date(assignment.due_at) > now) return;
    // if the learner’s submission is late (submitted_at is past due_at), 
    // deduct 10 percent of the total points possible from their score for that assignment.
    let score = submission.submission.score;
    if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
      score -= assignment.points_possible * 0.1;
    }

    totalScore += score;
    totalPointsPossible += assignment.points_possible;
  });

  return (totalScore / totalPointsPossible) * 100;
}

// 4 - Creat function calculate the assignements
function assignScore(learnsub, assgrp) {
  let objectAssignment = {};

  for (let i = 0; i < learnsub.length; i++) {
    const sub = learnsub[i];
    const assg = assgrp.assignments.find(a => a.id === sub.assignment_id);

    if (assg) {
      // Calculate the score, including late submission
      let score = sub.submission.score;
      if (new Date(sub.submission.submitted_at) > new Date(assg.due_at)) {
        score -= assg.points_possible * 0.1;
      }
     
      objectAssignment[assg.id] = Math.round((score / assg.points_possible) * 100); 
    }
  }

 

  return objectAssignment;
}


//5 - Create a function named getLearnerData() that accepts these values as parameters, in the order listed:
//  (CourseInfo, AssignmentGroup, [LearnerSubmission]
//  and returns the formatted result,

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  try {
    // check valid assignement using mismatchingId function 
    mismatchingId(courseInfo, assignmentGroup);

    //check valid possible_point using potentialError function
    //i have to go through assignmentGroup and then assignment
    //  to get the point_possible for all the assignment using method for each
    assignmentGroup.assignments.forEach(potentialError);

    //If an assignment is not yet due, do not include it in the results or the average.
    // Filter out assignments that are not yet due
    let assign = assignmentGroup.assignments.filter(j => new Date(j.due_at) <= new Date());

    // Initialize data structures which should be an array of objects
    // set the learnerData empty
    let learnerData = {};

    // get the learnerData.id from learnerSubmissions.learner_id 
    //set the average to 0 and asignement to emty and refill them later
    for (let i = 0; i < learnerSubmissions.length; i++) {
      const sub = learnerSubmissions[i];
      if (!learnerData[sub.learner_id]) {
        learnerData[sub.learner_id] = { id: sub.learner_id, avg: 0, scores: {} };
      }
    };


    //Refil the LearnerData.avg by going through reach learner 
    Object.keys(learnerData).forEach(learnerId => {
      const submissionsForLearner = learnerSubmissions.filter(sub => sub.learner_id === Number(learnerId));
      //refil the average 
      learnerData[learnerId].avg = Average(submissionsForLearner, assignmentGroup);
      //refil the saaignement score 
      learnerData[learnerId].scores = assignScore(submissionsForLearner, assignmentGroup);
    });

    return Object.values(learnerData);
  } catch (error) {
    console.error(error.message);
  }
}

const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);

console.log(result);

