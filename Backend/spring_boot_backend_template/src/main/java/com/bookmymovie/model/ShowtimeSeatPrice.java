import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ShowtimeSeatPriceId.class)
@Table(name = "showtime_seat_prices")
public class ShowtimeSeatPrice{
	
	@Id
	@ManyToOne
	@JoinColumn(name="showtime_id")
	private Showtime showtime;
	
    @Id
    @ManyToOne
    @JoinColumn(name = "type_id")
    private SeatType seatType;

    @NotNull
    private Double price;
	
	
}

