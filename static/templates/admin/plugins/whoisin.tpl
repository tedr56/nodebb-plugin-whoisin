<div class="row">
	<div class="col-lg-9">
		<div class="panel panel-default">
			<div class="panel-heading">Who is in? | Admin Page</div>
			<div class="panel-body">
				<form role="form" class="whoisin-settings">
					<div class="alert alert-danger">This pluin is not working yet.</div>
					<p>
						To use this plugin in a post just ask the question configured here
						in a post. The question will be replaced by a simple widget
					</p>
					<div class="form-group">
						<label for="setting-whoisin-question">Question</label>
						<input type="text" id="setting-whoisin-question" name="setting-whoisin-question" title="Who is in question" class="form-control" placeholder="Who is in?"><br />
					</div>
					<div class="form-group">
						<label for="setting-whoisin-response">Response</label>
						<input type="text" id="setting-whoisin-response" name="setting-whoisin-response" title="Who is in response" class="form-control" placeholder="I am in!"><br />
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">Control Panel</div>
			<div class="panel-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>

<script>
	require(['settings'], function(Settings) {
		Settings.load('whoisin', $('.whoisin-settings'));

		$('#save').on('click', function() {
			Settings.save('whoisin', $('.whoisin-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'whoisin-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply new whoisin settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				})
			});
		});
	});
</script>
