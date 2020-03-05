<div id="createReport" class="modal is-success">
	<div class="modal-background"></div>
	<div class="modal-card">
		<form>
			@csrf
			<section class="modal-card-body">
				<figure class="image is-1x1">
					<img src="" alt="" id="preview">
				</figure>
				<div class="field">
					<div class="control">
						<label>LATITUDE</label>
						<input class="input" type="number" name="lat" readonly>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label>LONGITUDE</label>
						<input class="input" type="text" name="long" readonly>
					</div>
				</div>
				<div class="field">
					<label>SEVERITY</label>
					<div class="control">
						<div class="select">
							<select name="severity">
								<option value="">Hello World</option>
								<option value="">Hello World sdfasdf gjasdgk</option>
							</select>
						</div>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label>DESCRIPTION</label>
						<textarea rows="5" class="textarea" name="description"></textarea>
					</div>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button id="cancel" class="button is-pulled-right is-white is-outlined" type="button">CANCEL</button>
				<button class="button is-pulled-right is-white has-text-success" type="submit">SUBMIT</button>
			</footer>
		</form>
	</div>
</div>
