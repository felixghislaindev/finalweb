
var stripe = Stripe('pk_test_cNqxVKxkd7Ftt62as1tsvj50');
var $checkoutform = $("#checkout");
$checkoutform.find("button").prop("disabled", true);