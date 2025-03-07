# what we have :
- ther is 3 main parent objects : CourseInfo , AssignmentGroup , LearnerSubmission
- and 2 sons objects : assignment (from AssignmentGroup), submission (LearnerSubmission)

# what we have to do :
- create an object called learnerData has ( "id ": number , "avg": number, "assignment_id" : number, )
- "id " is from the object LearnerSubmission 
- "avg" calculate the average scores :  sum(LearnerSubmission.submission.scor)/sum(AssignmentGroup.assignment.points_possible) * 100.
        taking into account only the assignments that are due.
        Deduct 10% of points possible if a submission is latee.
        function Average include all of this function.
   
- "assignment_id" get the key from AssignmentGroup.assignment
                 the value is (LearnerSubmission.submission.scor/AssignmentGroup.assignment.points_possible)*100 for each ID



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

