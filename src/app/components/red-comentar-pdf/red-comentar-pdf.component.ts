import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComentarRestClientService } from "src/app/services/red/comentar-red/comentar-rest-client.service";

@Component({
  selector: "app-red-comentar-pdf",
  templateUrl: "./red-comentar-pdf.component.html",
  styleUrls: ["./red-comentar-pdf.component.css"],
  providers: [ComentarRestClientService]
})
export class RedComentarPdfComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private comentarRestClientService: ComentarRestClientService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.comentarRestClientService
        .getComentariosByIdRed(params.get("id"))
        .subscribe(data => {});
    });
  }
}
