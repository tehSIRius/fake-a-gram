<?php
    include('db_communication.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST') 
    {
        $conn = get_connection();
        $value = $_POST['value'];

        switch($_POST['type'])
        {
            case 'username':
                echo(check_username($conn, $value));
            break;
            case 'email':
                if (check_email($conn, $value)) 
                {
                    echo('true');
                }
                else
                {
                    echo('false');
                }

            break;
            case 'login':
                echo(check_login($conn, $value, $_POST['secondValue']));
            break;
        }
    }
    else 
    {
        header('Location: /');
    }    

    function check_username($conn, $username)
    {
        if (get_user_id($conn, $username) == -1)
        {
            return 'true';
        }
        else
        {
            return 'false';
        }
    }

    function check_login($conn, $username, $pass) 
    {
        if (login($conn, $username, $pass))
            {
                session_start();
                $_SESSION["username"] = $username;

                return 'true';
            }
            else {
                return 'false';
            }
    }
?>