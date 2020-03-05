<div id="createReport" class="modal is-success">
	<div class="modal-background"></div>
	<div class="modal-card">
		<section class="modal-card-body">
			<form>
				@csrf
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
					<div class="control has-icons-left">
						<div class="select">
							<select id="severity" name="severity">
								<option value="" data-class="avatar" data-style="background-image:url('img/S1Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Critical</option>
								<option value="" data-class="avatar" data-style="background-image:url('img/S2Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Major</option>
								<option value="" data-class="avatar" data-style="background-image:url('img/S3Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Moderate</option>
								<option value="" data-class="avatar" data-style="background-image:url('img/S4Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Light</option>
								{{-- <option value="" data-class="avatar" data-style="background-image:url('img/RLabel.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Hello World</option> --}}
							</select>
						</div>
						<div class="icon is-left">
							<figure class="image is-32x32">
								<img src="{{ asset('img/S2Label.png') }}" alt="" class="is-rounded">
							</figure>
						</div>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label>DESCRIPTION</label>
						<textarea rows="5" class="textarea" name="description"></textarea>
					</div>
				</div>
				<button id="cancel" class="button is-pulled-right is-white is-outlined" type="button">CANCEL</button>
				<button class="button is-pulled-right is-white has-text-success" type="submit">SUBMIT</button>
			</form>
		</section>
	</div>
</div>
