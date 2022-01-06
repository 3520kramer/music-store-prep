<?php 
// include_once __DIR__ . '/../../../utilities/constants.php';
include_once __DIR__ . '/../../common/header/header.php';
echo get_header('Register', 'my-account/register/register.js');
?>

<section id="register-section">
  <h4>Register</h4>

  <form id="register-form" class="form-grid">
    <label for="FirstName">First name</label>
    <input type="text" id="FirstName" name="FirstName" />
    
    <label for="LastName">Last name</label>
    <input type="text" id="LastName" name="LastName" />
    
    <label for="Company">Company</label>
    <input type="text" id="Company" name="Company" />
    
    <label for="Address">Address</label>
    <input type="text" id="Address" name="Address" />
    
    <label for="City">City</label>
    <input type="text" id="City" name="City" />

    <label for="State">State</label>
    <input type="text" id="State" name="State" />
    
    <label for="Country">Country</label>
    <input type="text" id="Country" name="Country" />
    
    <label for="PostalCode">PostalCode</label>
    <input type="text" id="PostalCode" name="PostalCode" />
        
    <label for="Phone">Phone</label>
    <input type="text" id="Phone" name="Phone" />

    <label for="Fax">Fax</label>
    <input type="text" id="Fax" name="Fax" />
    
    <label for="Email">Email</label>
    <input type="text" id="Email" name="Email" />
    
    <label for="Password">Password</label>
    <input type="text" id="Password" name="Password" />

    <label for="Password2">Confirim password</label>
    <input type="text" id="Password2" name="Password2" />
    
    <input type="submit" value="Sign up" />
  </form>
  <!-- <div id="snackbar">Some text some message..</div> -->

</section>