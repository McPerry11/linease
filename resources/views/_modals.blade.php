<div id="createReport" class="modal is-success">
	<div class="modal-background"></div>
	<div class="modal-card">
		<section class="modal-card-body">
			<span id="loader" class="icon is-large has-text-white">
				<i class="fas fa-circle-notch fa-spin fa-3x"></i>
			</span>
			<form class="is-hidden">
				@csrf
				<figure class="image is-1x1">
					<img src="" alt="" id="preview">
				</figure>
				<div class="field">
					<div class="control">
						<label>LATITUDE</label>
						<input id="lat" class="input has-text-grey" type="number" name="lat" readonly>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label>LONGITUDE</label>
						<input id="lng" class="input has-text-grey" type="text" name="long" readonly>
					</div>
				</div>
				<div class="field">
					<label>SEVERITY</label>
					<div class="control has-icons-left">
						<div class="select">
							<select id="severity" name="severity">
								<option value="" data-class="avatar" data-img="S1Label.png" data-style="background-image:url('img/S1Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Critical</option>
								<option value="" data-class="avatar" data-img="S2Label.png" data-style="background-image:url('img/S2Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Major</option>
								<option value="" data-class="avatar" data-img="S3Label.png" data-style="background-image:url('img/S3Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Moderate</option>
								<option value="" data-class="avatar" data-img="S4Label.png" data-style="background-image:url('img/S4Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Light</option>
								{{-- <option value="" data-class="avatar" data-img="RLabel.png" data-style="background-image:url('img/RLabel.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Hello World</option> --}}
							</select>
						</div>
						<div class="icon is-left">
							<figure class="image is-32x32">
								<img src="" alt="" class="is-rounded">
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
