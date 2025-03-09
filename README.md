# what we have :
- ther is 3 main parent objects : CourseInfo , AssignmentGroup , LearnerSubmission
- and 2 sons objects : assignment (from AssignmentGroup), submission (LearnerSubmission)
- Most objects has a primary (PK) and foreigner key (FK) help to get the information from each others and check conditions 
- CourseInfo ( PK : id) , AssignmentGroup( PK : id, FK : course_id) , LearnerSubmission( PK : learner_id, FK : assignment_id)
  assignment ( PK : id)
  

# what we have to do :
- create an object called learnerData has ( "id ": number , "avg": number, "assignment_score" : {number}, )
- "id " can get it from the object LearnerSubmission 
- "avg" calculate the average scores :  sum(LearnerSubmission.submission.scor)/sum(AssignmentGroup.assignment.points_possible) * 100.
        taking into account only the assignments that are due.
        Deduct 10% of points possible if a submission is latee.
        function Average include all of this conditions.
   
- "assignment_score" get the key from AssignmentGroup.assignment
                 the value is (LearnerSubmission.submission.scor/AssignmentGroup.assignment.points_possible)*100 for each ID
                 taking into account only the assignments that are due.
                 Deduct 10% of points possible if a submission is latee.
                 function assignScore include all of this conditions.


# Conditions or function must be :
- ensure the assignment group belongs to the correct course (function mismatchingId)
- account for potential errors in the data that the program receives (function potentialError )

# solution : 
# functions:
- mismatchingId : ensure the assignment group belongs to the correct course
- function potentialError : points_possible can't be 0 and has to be Number
- average : calculate the average scores for each learner with the assignement conditions
- assignScore : calculate the assignments scores for each learner with the assignement conditions
- getLearnerData : main function and we call all the previous function inside 
                   intputs are the 3 parents objects (CourseInfo , AssignmentGroup , LearnerSubmission)
                   outputs is an array of objects (id , avr , assignment_id )

# Requirements : i gave exemples from my code with the line number
- Declare variables properly using let and const where appropriate (76. const sub = learnsub[i]; 49. let totalScore = 0;) 
- Use operators to perform calculations on variables and literals.(83. score -= assg.points_possible * 0.1; )
- Use at least two if/else statements to control program flow. (79.  if (assg) ; 116. if (!learnerData[sub.learner_id]))
- use at least one switch statement.(35. switch (true))
- Use try/catch statements to manage potential errors in the code, such as incorrectly formatted or typed data being fed into your   program. (98. in the getLearnerData function)
- Utilize at least two different types of loops.(75. for ; 114. while)
- Utilize at least one loop control keyword such as break or continue.(56. if (new Date(assignment.due_at) > now) continue;)
- Create and/or manipulate arrays and objects.(54. manipulation of an array ; 116. manipulation of an Object )
- Demonstrate the retrieval, manipulation, and removal of items in an array 
  or properties in an object (115. const sub = learnerSubmissions[m]; 86. objectAssignment[assg.id])
- Use functions to handle repeated tasks (127. Average(submissionsForLearner, assignmentGroup); 
 129. assignScore(submissionsForLearner, assignmentGroup);) this 2 get repitted because they are in foreach() loop
- Program outputs processed data as described above. Partial credit will be earned depending on the level of adherence to the described behavior.( outputs [
  { id: 1010, avg: 44, assignment_score: { '1': 55, '2': 37, '3': 80 }
  },
  { id: 1011, avg: 34, assignment_score: { '1': 34, '3': 65 } }])
- Ensure that the program runs without errors (cheked)
- Commit frequently to the git repository. (cheked : over 3 commits)
- Include a README file that contains a description of your application.( cheked)


