 CREATE
        OR REPLACE FUNCTION public."UpdateUser_isActive"(isActive boolean,
         userId int) LANGUAGE plpgsql AS $function$ beginUPDATE "user" u SET u."isActive"=isActive
WHERE u."UserId"=userId end; $function$ ;